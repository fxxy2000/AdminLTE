from flask import Flask, request, abort, make_response, jsonify, json

app = Flask(__name__)

class Book :
    def __init__(self, id, name=None, price=None, rating=None, desc=None, categories=None) :
        self.id = id
        self.name = name
        self.price = price
        self.rating = rating
        self.desc = desc
        self.categories = categories
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'price': self.price,
            'rating': self.rating, 
            'desc': self.desc,
            'categories': self.categories
        }
    
    def update(self, data) : 
        self.name = data['name']
        self.price = data['price']
        self.rating = data['rating']
        self.desc = data['desc']
        self.categories = data['categories']

books = [
    Book(1, 'Android Book 1', 23.34, 4, 'A book for Android', ['Financial' , 'IT']),
    Book(2, 'Java Book 2', 24.15, 1, 'A book for Java', ['Internet' , 'IT']),
    Book(3, 'Ios Book 3', 33.45, 3, 'A book for Ios', ['Financial' , 'IT', 'Internet']),
    Book(4, 'C# Book 4', 43.45, 3.5, 'A book for C#', ['Financial' , 'IT']),
    Book(5, 'Python Book 5', 53.45, 5, 'A book for Python', ['IT']),
    Book(6, 'C++ Book 6', 63.45, 4, 'A book for C++', ['Financial' , 'Internet']),
    Book(7, 'ASP.NET Book 7', 73.45, 2, 'A book for ASP.NET', ['Internet']),
    Book(8, 'Testing Book 8', 83.45, 3.5, 'A book for Testing', ['Internet' , 'IT']),
]

@app.route('/api/book', methods=['GET'])
@app.route('/api/book/search/<name>', methods=['GET'])
def getBookList(name=None) :
    if name:
        foundBook = []
        for book in books :
            if name.lower() in book.name.lower() :
                foundBook.append(book)
        response = make_response(jsonify([e.serialize() for e in foundBook])) 
    else :
        response = make_response(jsonify([e.serialize() for e in books]))
    
    print response
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'accept' 
    return response

@app.route('/api/book/<int:id>', methods=['GET', 'DELETE', 'OPTIONS'])
def getBookById(id) :
    response = None
    for book in books :
        if book.id == id :
            if request.method == 'GET' : 
                response = make_response(jsonify(book.serialize()))
            elif request.method == 'DELETE' :
                books.remove(book)
            
    if not response : 
        response = make_response()  
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'accept'
    return response

@app.route('/api/book/createOrUpdate/<int:id>', methods=['POST', 'OPTIONS'])
def createOrUpdate(id) :
    if request.method == 'POST' :
        data = json.loads(request.data)
        if id == 0 :
            # create a new book
            book = Book(books[-1].id + 1)
            book.update(data)
            books.append(book)
        else :
            updateBook = None
            for book in books :
                if book.id == id :
                    updateBook = book
                    break

            if not updateBook :
                # id not found in current books
                abort(404)
            
            # set new values
            updateBook.update(data)
            books.sort(key=lambda Book : Book.id)
        
    response = make_response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'content-type'
    return response, 200

if __name__ == '__main__' :
    app.run(debug=True, port=5000)