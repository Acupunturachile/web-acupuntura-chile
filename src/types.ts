export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface Treatment {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  usedFor: string;
  sessionDesc: string;
  benefits: string[];
  faqs: TreatmentFAQ[];
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface SuccessCase {
  name: string;
  condition: string;
  therapy: string;
  result: string;
  quote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  imageUrl?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface GoogleReview {
  name: string;
  rating: number;
  datePosted: string;
  text: string;
  link: string;
}

export interface EvaluationFormData {
  name: string;
  phone: string;
  symptomOrReason?: string;
}
