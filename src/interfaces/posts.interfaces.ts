import { ISeoRes } from './seo.interfaces';

export interface IPostResponseShort {
  node: {
    author: IAutor;
    date: string;
    excerpt: string;
    featuredImage: INode | null;
    slug: string;
    title: string;
    categories: ICategories;
    // content: string;
    // seo?: ISeoRes;
    // tags: ITags;
    // uri: string;
  };
}

export interface IPostResponse {
  author: IAutor;
  categories: ICategories;
  content: string;
  date: string;
  excerpt: string;
  featuredImage: INode | null;
  seo?: ISeoRes;
  slug: string;
  tags: ITags;
  title: string;
  uri: string;
}

interface INode {
  node: {
    sourceUrl: string;
  };
}

interface ICategories {
  edges: ICategory[];
}
interface ICategory {
  node: {
    name: string;
    slug: string;
    description: string;
  };
}

interface ITags {
  edges: ITag[];
}
interface ITag {
  node: {
    name: string;
  };
}

interface IAutor {
  node: {
    avatar: {
      url: string | null;
    };
    firstName: string | null;
    lastName: string | null;
    name: string | null;
  };
}

export interface IPagination {
  edges: IPaginationItem[];

  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
}

interface IPaginationItem {
  cursor: string;
  node: { slug: string; title: string; modified: string };
}
