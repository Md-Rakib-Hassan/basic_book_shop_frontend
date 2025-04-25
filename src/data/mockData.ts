import { Book, Order, User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@bookshop.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  }
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    category: 'Classic',
    description: 'A classic novel about the American Dream set in the Jazz Age.',
    image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 25,
    featured: true
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 14.99,
    category: 'Classic',
    description: 'A powerful story about racial injustice and moral growth in the American South.',
    image: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 30,
    featured: true
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 16.99,
    category: 'Science Fiction',
    description: 'An epic science fiction novel set in a distant future amidst a feudal interstellar society.',
    image: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 20,
    featured: true
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    category: 'Classic',
    description: 'A romantic novel about the Bennet family and the proud Mr. Darcy.',
    image: 'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 15,
    featured: false
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 13.99,
    category: 'Fantasy',
    description: 'A fantasy novel about Bilbo Baggins and his adventure with dwarves to reclaim a treasure guarded by a dragon.',
    image: 'https://images.pexels.com/photos/2943603/pexels-photo-2943603.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 35,
    featured: true
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    price: 10.99,
    category: 'Dystopian',
    description: 'A dystopian novel about totalitarianism, surveillance, and manipulation.',
    image: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 40,
    featured: true
  },
  {
    id: '7',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 9.99,
    category: 'Coming of Age',
    description: 'A novel about teenage angst and alienation.',
    image: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 12,
    featured: false
  },
  {
    id: '8',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 12.99,
    category: 'Dystopian',
    description: 'A dystopian novel about a futuristic world state and its control over reproduction and psychological manipulation.',
    image: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 18,
    featured: false
  }
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    books: [
      {
        bookId: '1',
        quantity: 1,
        price: 12.99
      },
      {
        bookId: '3',
        quantity: 1,
        price: 16.99
      }
    ],
    totalAmount: 29.98,
    status: 'delivered',
    createdAt: '2023-05-15T10:30:00Z',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      address: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'USA'
    }
  },
  {
    id: '2',
    userId: '2',
    books: [
      {
        bookId: '5',
        quantity: 2,
        price: 13.99
      }
    ],
    totalAmount: 27.98,
    status: 'processing',
    createdAt: '2023-06-02T14:15:00Z',
    paymentMethod: 'PayPal',
    shippingAddress: {
      address: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'USA'
    }
  }
];

// For demo authentication - in a real app, passwords would be hashed
export const userCredentials = [
  {
    email: 'admin@bookshop.com',
    password: 'admin123',
    userId: '1'
  },
  {
    email: 'john@example.com',
    password: 'john123',
    userId: '2'
  }
];