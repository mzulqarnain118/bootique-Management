from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bootique'

CORS(app)

def get_db_connection():
    try:
        connection = pymysql.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Database connection successful!")
        return connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL Database: {e}")
        return None

# API Endpoints

# User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    account = cursor.fetchone()

    if account:
        cursor.close()
        connection.close()
        return jsonify({'error': 'User already exists!'}), 400

    cursor.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s)', (username, email, password))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User registered successfully!'}), 201

# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
    user = cursor.fetchone()
    
    if user:
        session['user_id'] = user['id']
        cursor.close()
        connection.close()
        return jsonify({'message': 'Login successful!', 'user': user}), 200

    cursor.close()
    connection.close()
    return jsonify({'error': 'Invalid credentials!'}), 401

# Get Products with Filters
@app.route('/api/products', methods=['GET'])
def get_products():
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()

    # Base query
    query = "SELECT * FROM products WHERE 1=1"
    filters = []

    # Apply filters if they exist
    category = request.args.get('category')
    if category:
        query += " AND category = %s"
        filters.append(category)

    fabric_type = request.args.get('fabric_type')
    if fabric_type:
        query += " AND fabric_type = %s"
        filters.append(fabric_type)

    colors = request.args.get('colors')
    if colors:
        query += " AND FIND_IN_SET(%s, colors)"
        filters.append(colors)

    sizes = request.args.get('sizes')
    if sizes:
        query += " AND FIND_IN_SET(%s, sizes)"
        filters.append(sizes)

    product_type = request.args.get('type')
    if product_type:
        query += " AND type = %s"
        filters.append(product_type)

    min_price = request.args.get('min_price')
    if min_price:
        query += " AND price >= %s"
        filters.append(min_price)

    max_price = request.args.get('max_price')
    if max_price:
        query += " AND price <= %s"
        filters.append(max_price)

    cursor.execute(query, filters)
    product_list = cursor.fetchall()
    cursor.close()
    connection.close()
    
    return jsonify(product_list), 200
    
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()

    product_id = data['product_id']
    quantity = data['quantity']
    user_id = data['user_id']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()
    
    # Check current stock
    cursor.execute('SELECT stock FROM products WHERE id = %s', (product_id,))
    product = cursor.fetchone()
    if product['stock'] < quantity:
        cursor.close()
        connection.close()
        return jsonify({'error': 'Insufficient stock available'}), 400
    
    # Insert item into cart
    cursor.execute('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (%s, %s, %s)', (user_id, product_id, quantity))
    
    # Update stock
    cursor.execute('UPDATE products SET stock = stock - %s WHERE id = %s', (quantity, product_id))
    
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Item added to cart!'}), 201

# Get Cart Items
@app.route('/api/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM cart_items WHERE user_id = %s', (user_id,))
    user_cart_items = cursor.fetchall()
    
    cart_details = []
    for item in user_cart_items:
        cursor.execute('SELECT * FROM products WHERE id = %s', (item['product_id'],))
        product = cursor.fetchone()
        item['product'] = product
        cart_details.append(item)

    cursor.close()
    connection.close()
    return jsonify(cart_details), 200

# Checkout
@app.route('/api/checkout', methods=['POST'])
def checkout():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized access!'}), 401

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM cart_items WHERE user_id = %s', (user_id,))
    user_cart_items = cursor.fetchall()
    
    total_amount = 0
    for item in user_cart_items:
        cursor.execute('SELECT * FROM products WHERE id = %s', (item['product_id'],))
        product = cursor.fetchone()
        total_amount += item['quantity'] * product['price']
    
    cursor.execute('INSERT INTO orders (user_id, total_amount, status) VALUES (%s, %s, %s)', (user_id, total_amount, 'Pending'))
    connection.commit()

    # Clear the cart
    cursor.execute('DELETE FROM cart_items WHERE user_id = %s', (user_id,))
    connection.commit()

    cursor.close()
    connection.close()
    return jsonify({'message': 'Order placed successfully!'}), 201

@app.route('/api/cart', methods=['DELETE'])
def remove_from_cart():
    data = request.get_json()

    product_id = data['product_id']
    user_id = data['user_id']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()
    
    # Find the item in the cart
    cursor.execute('SELECT quantity FROM cart_items WHERE user_id = %s AND product_id = %s', (user_id, product_id))
    cart_item = cursor.fetchone()
    if not cart_item:
        cursor.close()
        connection.close()
        return jsonify({'error': 'Item not found in cart'}), 404

    # Remove item from cart
    cursor.execute('DELETE FROM cart_items WHERE user_id = %s AND product_id = %s', (user_id, product_id))
    
    # Update stock
    cursor.execute('UPDATE products SET stock = stock + %s WHERE id = %s', (cart_item['quantity'], product_id))
    
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Item removed from cart!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
