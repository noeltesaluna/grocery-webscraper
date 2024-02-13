from bs4 import BeautifulSoup
import requests

URL = "https://www.coles.com.au/product/coles-finest-mixed-selection-sausage-pack-500g-5928529"
page = requests.get(URL)

soup = BeautifulSoup(page.text, 'html.parser')

product_title = ""

if soup.find(class_ = "product__title") is not None:
    product_title = soup.find(class_ = "product__title").text
else: 
    print("That product doesn't exist")
    exit()

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

product_details = {
    "product_title": product_title,
    "product_price": product_price,
    "product_save_price": product_save_price,
    "product_special_offer_text": product_special_offer_text
}

print(product_details)