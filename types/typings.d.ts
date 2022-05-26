// Form Types
export type INewPostForm = {
    body: string
    username: string
    profileImg: string
    image?: string
    mood?: string
}

export type IPersonalInformationForm = {
    id: string
    username: string
    bio?: string
    firstName?: string
    lastName?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    phone?: string
}

// Sanity Types
export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    }
    comments: Comment[]
    description: string;
    mainImage: {
        asset: {
            url: string
        };
    }
    slug: {
        current: string;
    }
    body: [object];
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    }
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}