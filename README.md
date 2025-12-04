# BookNest 📚



BookNest is a Peer-to-Peer Book Sharing Platform designed to make reading more accessible and affordable. Built with the MERN stack, it allows users to lend, borrow, buy, and sell hardcover books securely through role-based access and a streamlined request system. With distance-based filtering, smart search, and an embedded map, users can easily find books nearby. Its modular architecture keeps the platform scalable, efficient, and community-driven.

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Sequence Diagram](#sequence-diagram)
- [ER Diagram](#er-diagram)
- [Technologies Used](#technologies-used)
- [Installation](#installation)


---

## Features

- **Book Lending:** Users can borrow books for a specified period.
- **Book Resale:** Users can sell their books locally.
- **AI Recommendations:** Personalized book suggestions based on user reading history.
- **User Reviews & Ratings:** Users can leave reviews and rate books.
- **Authentication & Authorization:** Secure login/signup with JWT.
- **Admin Panel:** Admins can manage users, books, and orders.
- **Order Management:** Track book lending, buying, and selling orders.
- **Payment Integration:** Seamless integration with SSLCOMMERZ for transactions.

---

## How It Works

BookNest is a **peer-to-peer book sharing platform** that provides a secure and convenient way to lend and borrow books between users. The process works as follows:

1. **Book Search:** A registered user browses available books using filters such as genre, academic category, distance, university, and subject.
2. **Request Lending:** Once a user finds a book available for lending, they can send a request with an optional note to the book owner.
3. **Owner Approval:** The book owner reviews the request in their "Manage Requests" section and can **accept or reject** it.
4. **Payment Stage:** If accepted, the requester completes the payment, which may include a lending fee and a security deposit based on the owner's settings. Payments are processed via **SSLCOMMERZ**, and the deposit is securely held in **Escrow**.
5. **Contact Exchange & Pickup:** After successful payment, the system shares contact details of both users to arrange pickup. A **system-generated PIN** verifies that the requester received the book.
6. **Book Return:** At the end of the lending period, the book owner collects the book at the pickup point and verifies the return using an **OTP**. The deposit is returned to the borrower minus the lending fee. Late returns allow the owner to claim the full deposit.
7. **Reviews:** Both users can leave reviews for each other and the book, fostering **transparency and trust** within the BookNest community.

This end-to-end process ensures a **secure, traceable, and user-friendly** lending and borrowing experience.

---

## Sequence Diagram

![Sequence Diagram](./public/images/Sequence%20Diagram.jpg)

_Description:_ The sequence diagram shows the end-to-end workflow of BookNest’s peer-to-peer book lending process. A user browses books using filters and sends a lending request to the book owner. The owner can accept or reject the request; if accepted, the borrower completes payment through the SSLCOMMERZ gateway, including any lending fee or security deposit.

After payment, both users receive each other’s contact information to arrange a pickup. The borrower verifies book collection using a system-generated PIN, and the fee is released to the owner while the deposit is held in escrow. When the borrowing period ends, the borrower returns the book and confirms it with an OTP. The system then releases the remaining deposit or transfers it to the owner if the book is not returned on time. Finally, both users can leave reviews to maintain trust within the community.

---

## ER Diagram

![ER Diagram](./public/images/ER%20Diagram.jpg)

_Description:_ The ER diagram outlines the core data structure of BookNest’s peer-to-peer book sharing platform. At the center is the User entity, storing profile details, account status, wallet balance, and serving as the owner or borrower in various transactions. The Book entity contains essential information such as title, author, ISBN, category, condition, price, and availability, and is linked to both the owner and a PickupPoint, which stores the location and coordinates for book collection.

Book borrowing and buying activities are managed through the Request entity, which tracks the requester, book owner, payment status, deposit details, lending period, and handover/return states. The Payment entity records all financial transactions, including lending fees and deposits, tied to specific requests. SecretPin ensures secure book handovers through temporary verification codes. Finally, Review and UserReview entities allow users to rate books and each other after completing a transaction.

Together, these entities form a structured, scalable data model that supports secure transactions, book management, payments, and user trust across the platform.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Framer Motion, Redux Toolkit
- **Backend:** Node.js, Express.js, TypeScript, JWT Authentication
- **Database:** MongoDB, Mongoose
- **Payment:** SSL Commerz Integration
- **Others:** dotenv for environment variables

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Md-Rakib-Hassan/peer_to_peer_book_sharing_platform_frontend.git
   ```
   

2. **Install dependencies**
    ```bash
    cd peer_to_peer_book_sharing_platform_frontend
    npm install
    ```
3. **Setup environment variables**
   - Create a `.env` file in the root directory and add:
   ```bash
    VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
    VITE_CLOUDINARY=your_cloudinary_upload_url_here
    ```

4. **Run the project**
   ### Backend
   - Run the backend first  
    - Repository: [peer_to_peer_book_sharing_platform_backend](https://github.com/Md-Rakib-Hassan/peer_to_peer_book_sharing_platform_backend)

   ### Frontend 
   - Run: ```npm run dev```






