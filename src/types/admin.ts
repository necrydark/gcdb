import { UserRole } from "@prisma/client";
import { z } from "zod";

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User extends BaseEntity {
  name: string;
  email: string;
  username: string;
  displayUsername?: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  emailVerified?: Date;
  image?: string;
  boxCC?: string;
  ingameRank?: string;
}

// Character types
export interface Character extends BaseEntity {
  name: string;
  slug: string;
  tag: string;
  jpName: string;
  jpTag: string;
  imageUrl: string;
  game?: string;
  // Add other character fields as needed
}

// Form types
export interface UserFormInput {
  name: string;
  email: string;
  username: string;
  displayUsername?: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  image?: string;
  boxCC?: string;
  ingameRank?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success?: string;
  error?: string;
  data?: T;
}

// Dashboard types
export interface DashboardCard {
  title: string;
  value: number | string;
  extra?: React.ReactNode;
}

// Data table types
export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  href?: string;
  variant?: "default" | "destructive";
}

// Filter types
export interface ColumnFilter {
  id: string;
  value: string;
}