
// Code Review API Client
import { getHeaders } from "../lib/api" // Helper to get Auth Headers

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CodeReviewRequest {
  code: string;
  language: string;
}

export interface Issue {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  line?: number;
  suggestion?: string;
}

export interface Suggestion {
  title: string;
  description: string;
  code?: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface CodeReviewResult {
  id?: string;
  score: number;
  issues: Issue[];
  suggestions: Suggestion[];
  resources: Resource[];
  createdAt?: string;
}

export const codeReviewAPI = {
  create: async (data: CodeReviewRequest) => {
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/code-reviews`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        // Handle rate limit 429 specifically
        if (response.status === 429) {
           const err = await response.json();
           throw new Error(err.error || "Rate limit exceeded");
        }
        const err = await response.json();
        throw new Error(err.error || "Failed to submit code review");
    }
    
    const result = await response.json();
    return result.review as CodeReviewResult;
  },

  getMyReviews: async (page = 1, limit = 10) => {
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/code-reviews/my-reviews?page=${page}&limit=${limit}`, {
        method: "GET",
        headers
    });
    
    if (!response.ok) {
         throw new Error("Failed to fetch reviews");
    }
    return response.json();
  },

  getReview: async (id: string) => {
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/code-reviews/${id}`, {
        method: "GET",
        headers
    });

    if (!response.ok) {
        throw new Error("Failed to fetch review");
    }
    const result = await response.json();
    return result.review as CodeReviewResult;
  },

  getStats: async () => {
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/code-reviews/stats`, {
        method: "GET",
        headers
    });

    if (!response.ok) {
        throw new Error("Failed to fetch stats");
    }
    const result = await response.json();
    return result.stats;
  },
};
