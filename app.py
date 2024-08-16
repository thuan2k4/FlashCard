from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.secret_key = 'Flashcard!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class data(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  quest = db.Column(db.String(100), unique=True, nullable=False)
  ans = db.Column(db.String(100), unique=True, nullable=False)
  
  def __init__ (self,quest,ans):
    self.quest = quest
    self.ans = ans

@app.route('/', methods = ['GET','POST'])
def home():

  if request.method == 'POST':
    handle = request.form['action']
    
    if handle == 'add':
      
      quest = request.form['Q']
      ans = request.form['A']

      new_card = data(quest,ans)
      
      if not data.query.filter_by(quest=quest).first():
        db.session.add(new_card)
        db.session.commit()
        
      else:
        flash('Data already in database!!', 'danger')
        
        
    elif handle == 'edit':
      
      quest_edit = request.form['Q_edit']
      ans_edit = request.form['A_edit']
      Id_edit = request.form['ID_edit']
      
      change_infor = data.query.filter_by(id=Id_edit).first()
      change_infor.quest = quest_edit
      change_infor.ans = ans_edit
      db.session.commit()
      
    else:
      
      delete_id = request.form['delete_id']
      data_element = data.query.filter_by(id=delete_id).first()
      db.session.delete(data_element)
      db.session.commit()
      
      
  Data = data.query.all()
  
  return render_template('index.html', data=Data)

if __name__ == '__main__':
  # with app.app_context():
  #   db.create_all()
  app.run(debug=True)