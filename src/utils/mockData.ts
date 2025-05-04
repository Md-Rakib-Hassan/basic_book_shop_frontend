import { IAuthor, IBook, IOrder, IUser, Category } from '../types';

// Mock Authors
export const mockAuthors: IAuthor[] = [
  {
    _id: '1',
    Name: 'Jane Austen',
    Email: 'jane.austen@example.com',
    Phone: '123-456-7890',
    BioGraphy: 'Jane Austen was an English novelist known primarily for her six major novels.',
    DateOfBirth: new Date('1775-12-16'),
    Nationality: 'British',
    Website: 'https://janeausten.org',
    ImageUrl: 'https://images.pexels.com/photos/7173056/pexels-photo-7173056.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '2',
    Name: 'George Orwell',
    Email: 'george.orwell@example.com',
    Phone: '234-567-8901',
    BioGraphy: 'George Orwell was an English novelist, essayist, journalist, and critic.',
    DateOfBirth: new Date('1903-06-25'),
    Nationality: 'British',
    Website: 'https://georgeorwell.org',
    ImageUrl: 'https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '3',
    Name: 'Maya Angelou',
    Email: 'maya.angelou@example.com',
    Phone: '345-678-9012',
    BioGraphy: 'Maya Angelou was an American poet, memoirist, and civil rights activist.',
    DateOfBirth: new Date('1928-04-04'),
    Nationality: 'American',
    Website: 'https://mayaangelou.org',
    ImageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Mock Books
export const mockBooks: IBook[] = [
  {
    _id: '1',
    Author: mockAuthors[0]._id as any,
    Title: 'Pride and Prejudice',
    ISBN: '978-1503290563',
    Category: Category.Fiction,
    Price: 12.99,
    StockQuantity: 50,
    PublishedYear: 1813,
    Description: 'Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet and Mr. Darcy.',
    ImageUrl: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '2',
    Author: mockAuthors[1]._id as any,
    Title: '1984',
    ISBN: '978-0451524935',
    Category: Category.Fiction,
    Price: 10.99,
    StockQuantity: 75,
    PublishedYear: 1949,
    Description: '1984 is a dystopian social science fiction novel by English novelist George Orwell.',
    ImageUrl: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '3',
    Author: mockAuthors[2]._id as any,
    Title: 'I Know Why the Caged Bird Sings',
    ISBN: '978-0345514400',
    Category: Category.SelfDevelopment,
    Price: 14.99,
    StockQuantity: 30,
    PublishedYear: 1969,
    Description: 'I Know Why the Caged Bird Sings is an autobiography describing the early years of American writer Maya Angelou.',
    ImageUrl: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '4',
    Author: mockAuthors[0]._id as any,
    Title: 'Sense and Sensibility',
    ISBN: '978-1503297159',
    Category: Category.Fiction,
    Price: 11.99,
    StockQuantity: 40,
    PublishedYear: 1811,
    Description: 'Sense and Sensibility is a novel by Jane Austen, published in 1811.',
    ImageUrl: 'https://images.pexels.com/photos/2898170/pexels-photo-2898170.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '5',
    Author: mockAuthors[1]._id as any,
    Title: 'Animal Farm',
    ISBN: '978-0451526342',
    Category: Category.Fiction,
    Price: 9.99,
    StockQuantity: 60,
    PublishedYear: 1945,
    Description: 'Animal Farm is an allegorical novella by George Orwell, first published in England in 1945.',
    ImageUrl: 'https://images.pexels.com/photos/3747279/pexels-photo-3747279.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '6',
    Author: mockAuthors[2]._id as any,
    Title: 'Letter to My Daughter',
    ISBN: '978-0812980035',
    Category: Category.SelfDevelopment,
    Price: 13.99,
    StockQuantity: 25,
    PublishedYear: 2008,
    Description: 'Letter to My Daughter is the third book of essays by Maya Angelou.',
    ImageUrl: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Mock Users
export const mockUsers: IUser[] = [
  {
    _id: '1',
    Name: 'John Doe',
    ProfileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    Email: 'john.doe@example.com',
    Password: 'hashed_password_1',
    Address: '123 Main St, Anytown, USA',
    Phone: '123-456-7890',
    UserType: 'user',
    isBlocked: false,
  },
  {
    _id: '2',
    Name: 'Jane Smith',
    ProfileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    Email: 'jane.smith@example.com',
    Password: 'hashed_password_2',
    Address: '456 Oak St, Somewhere, USA',
    Phone: '234-567-8901',
    UserType: 'user',
    isBlocked: false,
  },
  {
    _id: '3',
    Name: 'Admin User',
    ProfileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    Email: 'admin@example.com',
    Password: 'hashed_password_3',
    Address: '789 Pine St, Elsewhere, USA',
    Phone: '345-678-9012',
    UserType: 'admin',
    isBlocked: false,
  },
  {
    _id: '4',
    Name: 'Bob Johnson',
    ProfileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    Email: 'bob.johnson@example.com',
    Password: 'hashed_password_4',
    Address: '101 Elm St, Nowhere, USA',
    Phone: '456-789-0123',
    UserType: 'user',
    isBlocked: true,
  },
];

// Mock Orders
export const mockOrders: IOrder[] = [
  {
    _id: '1',
    UserId: mockUsers[0]._id as any,
    BookDetails: [
      { BookId: mockBooks[0]._id as any, Quantity: 1 },
      { BookId: mockBooks[1]._id as any, Quantity: 2 },
    ],
    OrderDate: new Date('2023-05-15'),
    PaymentStatus: 'Completed',
    PaymentMethod: 'Credit Card',
    OrderStatus: 'Delivered',
    SubTotal: 34.97,
    Total: 39.97,
  },
  {
    _id: '2',
    UserId: mockUsers[1]._id as any,
    BookDetails: [
      { BookId: mockBooks[2]._id as any, Quantity: 1 },
    ],
    OrderDate: new Date('2023-06-20'),
    PaymentStatus: 'Completed',
    PaymentMethod: 'PayPal',
    OrderStatus: 'Shipped',
    SubTotal: 14.99,
    Total: 19.99,
  },
  {
    _id: '3',
    UserId: mockUsers[0]._id as any,
    BookDetails: [
      { BookId: mockBooks[3]._id as any, Quantity: 1 },
      { BookId: mockBooks[4]._id as any, Quantity: 1 },
    ],
    OrderDate: new Date('2023-07-05'),
    PaymentStatus: 'Pending',
    PaymentMethod: 'Credit Card',
    OrderStatus: 'Processing',
    SubTotal: 21.98,
    Total: 26.98,
  },
  {
    _id: '4',
    UserId: mockUsers[2]._id as any,
    BookDetails: [
      { BookId: mockBooks[5]._id as any, Quantity: 2 },
    ],
    OrderDate: new Date('2023-08-10'),
    PaymentStatus: 'Completed',
    PaymentMethod: 'Credit Card',
    OrderStatus: 'Delivered',
    SubTotal: 27.98,
    Total: 32.98,
  },
];

// Get full book data with author included
// export const getBookWithAuthor = (bookId: string) => {
//   const book = mockBooks.find(b => b._id === bookId);
//   if (!book) return null;
  
//   const author = mockAuthors.find(a => a._id === book.Author);
//   return { ...book, Author: author };
// };

// Get full order data with user and books included
export const getOrderWithDetails = (orderId: string) => {
  const order = mockOrders.find(o => o._id === orderId);
  if (!order) return null;
  
  const user = mockUsers.find(u => u._id === order.UserId);
  const bookDetails = order.BookDetails.map(bd => {
    const book = getBookWithAuthor(bd.BookId as string);
    return { ...bd, BookId: book };
  });
  
  return { ...order, UserId: user, BookDetails: bookDetails };
};

// For statistics
export const getStats = () => {
  return {
    totalBooks: mockBooks.length,
    totalAuthors: mockAuthors.length,
    totalUsers: mockUsers.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.Total, 0),
    recentOrders: mockOrders.sort((a, b) => 
      new Date(b.OrderDate as Date).getTime() - new Date(a.OrderDate as Date).getTime()
    ).slice(0, 5),
    booksByCategory: {
      Fiction: mockBooks.filter(book => book.Category === Category.Fiction).length,
      Science: mockBooks.filter(book => book.Category === Category.Science).length,
      SelfDevelopment: mockBooks.filter(book => book.Category === Category.SelfDevelopment).length,
      Poetry: mockBooks.filter(book => book.Category === Category.Poetry).length,
      Religious: mockBooks.filter(book => book.Category === Category.Religious).length,
    },
    lowStockBooks: mockBooks.filter(book => book.StockQuantity < 30),
  };
};