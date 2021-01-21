import requests
from bs4 import BeautifulSoup

#https://www.geeksforgeeks.org/extract-all-the-urls-from-the-webpage-using-python/

url = 'https://www.geeksforgeeks.org/extract-all-the-urls-from-the-webpage-using-python/'
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')

urls = []
for link in soup.find_all('a'):
    print(link.get('href'))