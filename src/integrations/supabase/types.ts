export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_us: {
        Row: {
          created_at: string | null
          id: number
          mission: string | null
          overview: string | null
          url: string
          vision: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          mission?: string | null
          overview?: string | null
          url: string
          vision?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          mission?: string | null
          overview?: string | null
          url?: string
          vision?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          awards_recognitions: string[] | null
          budget_range: string | null
          challenges: Json | null
          company_logo: string | null
          company_name: string | null
          content: Json
          cover_image: string | null
          created_at: string
          custom_message: string | null
          guarantees: string[] | null
          id: string
          internal_resources: Json | null
          landing_image: string | null
          persuasion_level: string | null
          primary_goal: string | null
          proposal_tone: string | null
          prospect_details: string | null
          reasons_to_work_with: string | null
          recommended_strategies: Json | null
          relevant_experience: string[] | null
          services: Json | null
          status: string
          strengths: Json | null
          success_metrics: Json | null
          target_audience: Json | null
          testimonials: Json | null
          timeframe: string | null
          title: string
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          awards_recognitions?: string[] | null
          budget_range?: string | null
          challenges?: Json | null
          company_logo?: string | null
          company_name?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          custom_message?: string | null
          guarantees?: string[] | null
          id?: string
          internal_resources?: Json | null
          landing_image?: string | null
          persuasion_level?: string | null
          primary_goal?: string | null
          proposal_tone?: string | null
          prospect_details?: string | null
          reasons_to_work_with?: string | null
          recommended_strategies?: Json | null
          relevant_experience?: string[] | null
          services?: Json | null
          status?: string
          strengths?: Json | null
          success_metrics?: Json | null
          target_audience?: Json | null
          testimonials?: Json | null
          timeframe?: string | null
          title: string
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          awards_recognitions?: string[] | null
          budget_range?: string | null
          challenges?: Json | null
          company_logo?: string | null
          company_name?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          custom_message?: string | null
          guarantees?: string[] | null
          id?: string
          internal_resources?: Json | null
          landing_image?: string | null
          persuasion_level?: string | null
          primary_goal?: string | null
          proposal_tone?: string | null
          prospect_details?: string | null
          reasons_to_work_with?: string | null
          recommended_strategies?: Json | null
          relevant_experience?: string[] | null
          services?: Json | null
          status?: string
          strengths?: Json | null
          success_metrics?: Json | null
          target_audience?: Json | null
          testimonials?: Json | null
          timeframe?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_about_us: {
        Args: {
          _url: string
          _mission: string
          _vision: string
          _overview: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
