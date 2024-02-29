from bs4 import BeautifulSoup
from models import ProductListing
import requests
def coles_webscraper(_URL):
    page = requests.get(_URL)
    soup = BeautifulSoup(page.text, 'html.parser')

    product_title = ""
    code = ""

    if soup.find(class_ = "product__title") is not None:
        product_title = soup.find(class_ = "product__title").text
        code = soup.find('p', attrs={'data-testid': 'product-code'}).text
        code = int(code[code.find(": ") + 1:])
    else: 
        raise ValueError("That URL doesn't exist")

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
    
    new_productlisting = ProductListing(
        code=code,
        name=product_title,
        supermarket="Coles",
        price=product_price,
        price_off=product_save_price,
        offer_text=product_special_offer_text,
        url = _URL
    )

    return new_productlisting