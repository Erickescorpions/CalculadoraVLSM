from flask import Flask, render_template

# creamos una aplicacion
app = Flask(__name__)

@app.route('/')
def index():
    data = {
        'titulo': 'Home',
        'parrafo': 'esta es mi pagina de prueba'
    }
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
