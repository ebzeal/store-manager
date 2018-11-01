
  CREATE DATABASE store-manager
  \connect store-manager
  
  
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
        attendant VARCHAR(128),
        productName VARCHAR(128),
        quantity VARCHAR(225),
        amount VARCHAR(128),
        productSpec VARCHAR(128),
        productPrice VARCHAR(225),
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

