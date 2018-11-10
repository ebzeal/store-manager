CREATE DATABASE "store-manager-test";
\connect "store-manager-test"

   CREATE TABLE IF NOT EXISTS
        users(
        id SERIAL PRIMARY KEY,
        userName VARCHAR(128),
        userEmail VARCHAR(128),
        userPriviledge VARCHAR(128),
        password VARCHAR(128),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      products(
        id SERIAL PRIMARY KEY,
        productCategory VARCHAR(128),
        productName VARCHAR(128),
        productImage VARCHAR(225),
        productDetails VARCHAR(128),
        productSpec VARCHAR(128),
        productPrice VARCHAR(225),
        dateAdded DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      sales(
        id SERIAL PRIMARY KEY,
        salesid VARCHAR(128),
        attendant VARCHAR(128),
        productName VARCHAR(128),
        quantity VARCHAR(225),
        amount VARCHAR(128),
        salesTime DATE NOT NULL DEFAULT CURRENT_DATE,
        salesDate DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      categories(
        id SERIAL PRIMARY KEY,
        categoryName VARCHAR(128),
        categoryDetails VARCHAR(225),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );


CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        incidentTime VARCHAR(128),
        incidentImage VARCHAR(128),
        incidentDetails VARCHAR(328),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );

INSERT INTO users (userName, userEmail, userPriviledge,password)VALUES('olu Sola','olu@me.com','Admin','$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS'),('Way Ward','way@ward.com','User','$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS');

INSERT INTO products(productCategory,productName,productImage,productDetails,productSpec,productPrice)VALUES('Toiletries','Bath Soap','pack.jpg','For Fresh Bath','80mg per pack','N300'),('Food','Bread','bread.jpg','Wheat Flavored Bread','200g per pack','450'),('Drinks','Vanilla Fruity','vanilla.jpg','For Parties','200g per pack','1550');

INSERT INTO sales(salesid,attendant,productName,quantity,amount)VALUES('1','2','3','5', 'N20,000'),('1','1','3','7', 'N20,000'),('1','2','1','8', 'N20,000');

INSERT INTO categories(id,categoryName,categoryDetails)VALUES('Food','For Eating, Obviously'),('Drinks','For Drinking'),('Toiletries','For toilets');

INSERT INTO incidents(incidentTime,incidentImage,incidentDetails)VALUES('8am','disagreement.jpg','An angry client'),('5.30pm','broken.jpg','Broken Panes');