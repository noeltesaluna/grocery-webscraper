from flask import request, jsonify
from config import app, db
from webscraper import coles_webscraper
from models import ProductListing
from bs4 import BeautifulSoup
import requests
# create ProductListing

@app.route("/productlistings", methods=["GET"])
def get_productlistings():
    # obtain product listings in the form of python objects
    productlistings = ProductListing.query.all()
    # convert product listings into python dictionary list
    json_productlistings = list(map(lambda x: x.to_json(), productlistings))
    return jsonify({"productlistings": json_productlistings})

@app.route("/create_productlisting", methods=["POST"])
def create_productlisting():
    URL = request.json.get("url")

    try:
        new_productlisting = coles_webscraper(URL)
        db.session.add(new_productlisting)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Product listing created!"}), 201

@app.route("/update_productlistings", methods=["POST"])
def update_productlistings():
    productlistings = ProductListing.query.all()

    for productlisting in productlistings:
        page = requests.get("https://www.coles.com.au/product/" + str(productlisting.code))

        soup = BeautifulSoup(page.text, 'html.parser')
        product_price = soup.find(class_ = "price__value").text
        product_price = product_price[product_price.find("$") + 1:]
        product_save_price = 0
        product_special_offer_text = ""

        # check if product is on special
        if soup.find(class_ = "is-special") is not None:
            
            # check if product has special offer (i.e 2 for $10)
            if soup.find('button', attrs={'data-testid': 'complex-promotion-link'}) is not None:
                product_special_offer_text = soup.find('button', attrs={'data-testid': 'complex-promotion-link'}).text
            
            # check if proudct price drop (i.e "Save $0.25")
            else:
                product_save_price = soup.find('section', class_ = "badge-label").text
                product_save_price = product_save_price[product_save_price.find("$") + 1:]
        
        productlisting.price = product_price
        productlisting.price_off = product_save_price
        productlisting.offer_text = product_special_offer_text
    
    db.session.commit()
    
    return jsonify({"message": "Updated product listings!"}), 201

        


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)