## 設計概念

在不開啟證券app情況下，還是能夠隨時關注自選股和庫存股。再次練習Vue3之外，也自己練習也順便股票價格因為是串接證交所的資料，怕api一直抓取會被阻擋，所以目前設定每五秒抓取一次證交所的api


## 專案說明

- 網站主要使用使用Vue.js和Vue vite架設而成
- 引入Vue Axios和 Vue Router等套件
- 加入Eslint Airbnb
- 使用Vue Composition API
- 使用NodeJS 架設API

## 網站Demo

https://deutsches.github.io/stock/

https://github.com/deutsches/stock_API (API程式碼)

## 使用技術

- Node.js 
- Vue
- Vite
- Vue Router
- Axios
- Bootstrap 5
- Vee Validation
- Sweetalert2
- ESlint(aribnb)
- C3.js
- Google Firebase

## 註冊

第一次使用要先註冊，如果要測試價格警示功能需註冊能收信的email

![image](https://user-images.githubusercontent.com/23115087/232695298-f79355d2-b411-4a31-9b77-029e17e8690b.png)

## 登入

註冊完，會自動切換到登入畫面

![image](https://user-images.githubusercontent.com/23115087/232696776-9e71afec-fce7-4d2e-909a-321d00a106a6.png)

## 首頁

主要功能有庫存股和關注股兩種

![image](https://user-images.githubusercontent.com/23115087/232699983-12c80000-e2b9-4d9b-ab44-f5f11a581440.png)


## 庫存股介紹

不管是股票代號或是名稱都有提示功能

![image](https://user-images.githubusercontent.com/23115087/232359236-20845ff4-7600-461a-aa0f-d30e561b4e70.png)
![image](https://user-images.githubusercontent.com/23115087/232359280-cb562391-182d-4f4b-882b-0a07dc3a0c73.png)

可以自行輸入目前擁有的股數和成交價

![image](https://user-images.githubusercontent.com/23115087/232361082-e55fe6ef-4280-4f95-a67e-593ca7b21a49.png)

新增完成後，會記錄即時的損益和報酬率，也同時有加權指數和櫃買指數的資訊

![image](https://user-images.githubusercontent.com/23115087/232363038-6e6a7b97-0ea0-47ea-a86b-1f4d8834f10d.png)

同樣公司重複輸入會自動加總

![image](https://user-images.githubusercontent.com/23115087/232367942-03a149d7-d8e1-4c1e-bcbe-e6532b052929.png)

可以展開看輸入的細項，也可以刪除其中一項

![image](https://user-images.githubusercontent.com/23115087/232370908-e692b50f-e836-4ce5-8678-d3b39154523b.png)

新增多的庫存公司也會有圓餅圖看資金比例

![image](https://user-images.githubusercontent.com/23115087/232385664-acea137b-c4ee-4d34-a315-e587915b265b.png)

## 關注股介紹

新增的關注股有漲跌跟幅度的資訊

![image](https://user-images.githubusercontent.com/23115087/232693124-7d34b128-e0bf-4ef5-93c3-cc189394b117.png)


價格警示功能

![image](https://user-images.githubusercontent.com/23115087/232691078-afce685b-8084-4412-97a8-8a2794bad80c.png)

當成交價等於警示價格就會寄信通知user

![image](https://user-images.githubusercontent.com/23115087/232690846-710e84ad-58d4-4368-801e-6e67b227fb7d.png)






