CREATE TABLE vendors (
  id Int PRIMARY KEY,
  name Varchar
);

INSERT INTO vendors (id, name)
VALUES
  (1, "Hmbldt"),
  (2, "Valhalla"),
  (3, "Kiva"),
  (4, "Pax"),
  (5, "Himalaya");

CREATE TABLE products (
  id Int PRIMARY KEY,
  name Varchar,
  vendor_id Int, FOREIGN KEY(vendor_id) REFERENCES vendors(id)
);

INSERT INTO products (id, name, vendor_id)
VALUES
  (1, "Sleep Pen", 1),
  (2, "Relax Pen", 1),
  (3, "CBD Gummies", 2),
  (4, "Indica Gummies", 2),
  (5, "Sativa Gummies", 2),
  (6, "Era Vape Pen", 4),
  (7, "Blue Dream Cartridge", 5),
  (8, "Sour Diesel Cartridge", 5);

SELECT vendors.name, COUNT(products.id) product_count
FROM vendors
LEFT JOIN products
ON vendors.id = products.vendor_id
GROUP BY vendors.id
ORDER BY product_count
DESC;
