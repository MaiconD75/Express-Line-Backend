# Express Line Backend

Status: development ⚠

## What is

A tool to manage your deliveries and delivery men from your business

## About

With this API you can hire deliverymen and define recipients and origins to register new deliveries.

As a delivery man you can get the product and register the product to delivery and register the end of delivery with a picture of recipient signature
in addition to being able to inform problems with delivery for your cancellation.

A delivery man is only able to do 5 deliveries per day at 8:00 AM to 18:00 PM.

## Entities
* ### Users
  * id: uuid;  
  * email: uuid;  
  * name: varchar;
  * password_has: varchar;
  * created_at: timestamp;  
  * updated_at: timestamp;  
  * verified: boolean;
  
* ### Deliverymen
  * id: uuid;  
  * user_id: uuid;
  * name: varchar;
  * avatar: varchar;  
  * email: varchar;
  * created_at: timestamp;  
  * updated_at: timestamp;  

  
* ### Origins
  * id: uuid;  
  * user_id: uuid;
  * street: varchar;
  * number: integer;  
  * complement: varchar;
  * city: varchar;
  * state: varchar;
  * zip_code: varchar;
  * created_at: timestamp;  
  * updated_at: timestamp;  
  
* ### Recipients
  * id: uuid;  
  * user_id: uuid;
  * name: varchar;
  * street: varchar;
  * number: integer;  
  * complement: varchar;
  * city: varchar;
  * state: varchar;
  * zip_code: varchar;
  * created_at: timestamp;  
  * updated_at: timestamp; 
  
* ### Deliveries
  * id: uuid;  
  * user_id: uuid;
  * deliveryman_id: uuid;
  * origin_id: uuid;  
  * recipient_id: uuid;
  * signature: varchar;
  * product: varchar;
  * canceled_at: timestamp;  
  * start_date: timestamp;  
  * end_date: timestamp;  
  * created_at: timestamp;  
  * updated_at: timestamp;  
  
* ### Delivery_problems
  * id: uuid;  
  * delivery_id: uuid;
  * description: varchar;
  * created_at: timestamp;  
  * updated_at: timestamp;  
