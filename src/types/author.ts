
export interface IAuthor {
    _id: string;
    Name: string;
    Email: string;
    Phone: string;
    BioGraphy: string;
    DateOfBirth: Date;
    Nationality: string;
    Website?: string;
    ImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }