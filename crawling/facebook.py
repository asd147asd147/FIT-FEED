from bs4 import BeautifulSoup as BS4
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import datetime
import time
import re
import json


def facebook(email, password, dirs):
    #webdriverLocation = 'Chrome_90.0.4430.24_linux64\\chromedriver.exe'
    webdriverLocation = 'crawling\\Chrome_90.0.4430.24\\chromedriver.exe'

    options = webdriver.ChromeOptions()
    # options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument('disable-gpu')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36")
    options.add_experimental_option("prefs",{"profile.default_content_setting_values.notifications" : 2})
    driver = webdriver.Chrome(webdriverLocation, chrome_options = options)

    # 로그인
    driver.get('https://www.facebook.com')
    driver.find_element_by_xpath('//*[@id="email"]').click()
    driver.find_element_by_xpath('//*[@id="email"]').send_keys(email)
    driver.find_element_by_xpath('//*[@id="pass"]').send_keys(password)
    driver.find_element_by_xpath('/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/form/div[2]/button').click()
    driver.implicitly_wait(5)



    # 게시글 불러오기를 위한 5초간 스크롤 다운 실행
    start = datetime.datetime.now()
    end = start + datetime.timedelta(seconds=5)
    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(1)
        if datetime.datetime.now() > end:
            break
    html = driver.page_source
    soup = BS4(html,'html.parser')

    # f = open("Python\\Facebook.html", 'r', encoding="utf8")
    # soup = BS4(f,'html.parser')

    data = []
    content_list = soup.find_all(attrs={'data-pagelet': re.compile('^FeedUnit')})
    for content in content_list:
        # 그룹 페이지에서 글쓰는건 못불러옴.
        pageName = content.find('strong')
        if pageName:
            pageName = pageName.getText()
        else :
            pageName = ""
        pageImg = content.find('g',attrs={'mask':re.compile(r'jsc_.+?\)')}).find('image')
        if pageImg:
            pageImg = pageImg.attrs['xlink:href']
        else:
            pageImg = ""

        mainText = ""
        mainImg = []
        for textIter in content.find_all('div',attrs={'dir':'auto', 'style':re.compile('text-align:.*')}):
            mainText += textIter.getText() + '\n'
        for imgIter in content.find_all('img',attrs={'alt': re.compile('.+')}):
            mainImg.append({
                "src" : imgIter.attrs['src'],
                # "height": imgIter.attrs['height'],
                # "width" : imgIter.attrs['width']
            })
        dataIter = {
            "pageName" : pageName,
            "pageImage" : {
                "type" : "img",
                "src" : pageImg,
                # 40 -> 40px
                "height": 40,
                "width" : 40,
            },
            "description" : mainText,
            "media" : mainImg
        }
        data.append(dataIter)

    jsonData = {}
    jsonData["data"] = data

    with open(dirs + "\\facebook.json", "w", encoding='utf8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii = False)

