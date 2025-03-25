export class Person {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  city: string;
  training: string;
  technologies: string;
  avatarUrl: string;
  githubUser: string;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
    city?: string,
    training?: string,
    technologies?: string,
    avatar?: string,
    githubUser?: string,
  ) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();;
    this.city = city || '';
    this.training = training || '';
    this.technologies = technologies || '';
    this.avatarUrl = avatar || '';
    this.githubUser = githubUser || '';
  }
}
