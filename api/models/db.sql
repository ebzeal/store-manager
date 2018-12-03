
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
        usersProfile(
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        userAddress VARCHAR(128),
        userPhone VARCHAR(128),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );
      

CREATE TABLE IF NOT EXISTS
      categories(
        id SERIAL PRIMARY KEY,
        categoryName VARCHAR(128),
        categoryDetails VARCHAR(225),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );


CREATE TABLE IF NOT EXISTS
      products(
        id SERIAL PRIMARY KEY,
        categories_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        productName VARCHAR(128),
        productImage VARCHAR(225),
        productDetails VARCHAR(128),
        productSpec VARCHAR(128),
        productPrice NUMERIC(10,2) DEFAULT 0,
        productQuantity INTEGER,
        productLimit INTEGER,
        dateAdded DATE NOT NULL DEFAULT CURRENT_DATE,
        dateModified DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      sales(
        id SERIAL PRIMARY KEY,
        invoice_num INTEGER,
        products_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        users_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quantity INTEGER,
        amount NUMERIC(10,2),
        totalAmount NUMERIC(10,2),
        salesTime DATE NOT NULL DEFAULT CURRENT_DATE,
        salesDate DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        users_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        incidentTime VARCHAR(128),
        incidentImage VARCHAR(128),
        incidentDetails VARCHAR(328),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      notifications(
        id SERIAL PRIMARY KEY,
        notifications VARCHAR(128),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      feedback(
        id SERIAL PRIMARY KEY,
        users_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        products_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        title VARCHAR(128),
        details VARCHAR(128),
        timeAdded DATE NOT NULL DEFAULT CURRENT_DATE
      );

INSERT INTO users (userName, userEmail, userPriviledge,password)VALUES('olu Sola','olu@me.com','Admin','$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS'),('Way Ward','way@ward.com','User','$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS');

INSERT INTO categories(categoryName,categoryDetails)VALUES('Food','For Eating, Obviously'),('Drinks','For Drinking'),('Toiletries','For toilets');

INSERT INTO products(categories_id,productName,productImage,productDetails,productSpec,productPrice, productQuantity, productLimit)VALUES(1,'Bath Soap','pack.jpg','For Fresh Bath','80mg per pack',300, 300, 50),(1,'Bread','bread.jpg','Wheat Flavored Bread','200g per pack',450,200,20),(2,'Vanilla Fruity','vanilla.jpg','For Parties','200g per pack',1550,150,10);


INSERT INTO incidents(users_id,incidentTime,incidentImage,incidentDetails)VALUES(2,'8am','disagreement.jpg','An angry client'),(2,'5.30pm','broken.jpg','Broken Panes');
