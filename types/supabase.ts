export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clicks: {
        Row: {
          id: number
          created_at: string | null
          ip: string | null
          country: string | null
          city: string | null
          user_agent: string | null
          link_id: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          ip?: string | null
          country?: string | null
          city?: string | null
          user_agent?: string | null
          link_id: number
        }
        Update: {
          id?: number
          created_at?: string | null
          ip?: string | null
          country?: string | null
          city?: string | null
          user_agent?: string | null
          link_id?: number
        }
      }
      links: {
        Row: {
          id: number
          created_at: string | null
          long_url: string
          key: string
          user_id: string
          total_clicks: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          long_url: string
          key: string
          user_id: string
          total_clicks?: number
        }
        Update: {
          id?: number
          created_at?: string | null
          long_url?: string
          key?: string
          user_id?: string
          total_clicks?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
