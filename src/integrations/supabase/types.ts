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
      bets: {
        Row: {
          bet_amount: number
          created_at: string | null
          game_data: Json | null
          game_type: string
          id: string
          multiplier: number | null
          result: string | null
          user_id: string
          win_amount: number | null
        }
        Insert: {
          bet_amount: number
          created_at?: string | null
          game_data?: Json | null
          game_type: string
          id?: string
          multiplier?: number | null
          result?: string | null
          user_id: string
          win_amount?: number | null
        }
        Update: {
          bet_amount?: number
          created_at?: string | null
          game_data?: Json | null
          game_type?: string
          id?: string
          multiplier?: number | null
          result?: string | null
          user_id?: string
          win_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      betting_system_settings: {
        Row: {
          created_at: string | null
          game_type: string
          id: string
          is_enabled: boolean | null
          max_bet: number | null
          max_win: number | null
          min_bet: number | null
          updated_at: string | null
          win_pattern: number[] | null
          win_ratio: number | null
        }
        Insert: {
          created_at?: string | null
          game_type: string
          id?: string
          is_enabled?: boolean | null
          max_bet?: number | null
          max_win?: number | null
          min_bet?: number | null
          updated_at?: string | null
          win_pattern?: number[] | null
          win_ratio?: number | null
        }
        Update: {
          created_at?: string | null
          game_type?: string
          id?: string
          is_enabled?: boolean | null
          max_bet?: number | null
          max_win?: number | null
          min_bet?: number | null
          updated_at?: string | null
          win_pattern?: number[] | null
          win_ratio?: number | null
        }
        Relationships: []
      }
      bonus_popup_settings: {
        Row: {
          button_text: string | null
          created_at: string
          id: string
          image_url: string | null
          popup_description: string | null
          popup_title: string
          updated_at: string
          welcome_message: string | null
        }
        Insert: {
          button_text?: string | null
          created_at: string
          id?: string
          image_url?: string | null
          popup_description?: string | null
          popup_title: string
          updated_at: string
          welcome_message?: string | null
        }
        Update: {
          button_text?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          popup_description?: string | null
          popup_title?: string
          updated_at?: string
          welcome_message?: string | null
        }
        Relationships: []
      }
      deposit_config: {
        Row: {
          created_at: string | null
          id: string
          top_number: string
          transaction_id_prefix: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          top_number?: string
          transaction_id_prefix?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          top_number?: string
          transaction_id_prefix?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      deposit_tracking: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_method: string
          status: string | null
          transaction_id: string
          user_id: string | null
          username: string
          wallet_number: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_method: string
          status?: string | null
          transaction_id: string
          user_id?: string | null
          username: string
          wallet_number?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_method?: string
          status?: string | null
          transaction_id?: string
          user_id?: string | null
          username?: string
          wallet_number?: string | null
        }
        Relationships: []
      }
      deposits: {
        Row: {
          amount: number
          confirmed_at: string | null
          created_at: string | null
          id: string
          payment_method: string
          status: string | null
          transaction_hash: string | null
          user_id: string
        }
        Insert: {
          amount: number
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          payment_method: string
          status?: string | null
          transaction_hash?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string
          status?: string | null
          transaction_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deposits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      image_configs: {
        Row: {
          created_at: string | null
          id: string
          image_key: string
          image_type: string
          image_url: string
          item_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_key: string
          image_type: string
          image_url: string
          item_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_key?: string
          image_type?: string
          image_url?: string
          item_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_numbers: {
        Row: {
          created_at: string
          id: string
          name: string
          number: string
          payment_method: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          number: string
          payment_method: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          number?: string
          payment_method?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          balance: number | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          referral_code: string | null
          referred_by: string | null
          role: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          email?: string | null
          id: string
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          bonus_amount: number | null
          bonus_paid: boolean | null
          created_at: string | null
          id: string
          is_paid: boolean | null
          referred_id: string
          referrer_id: string
        }
        Insert: {
          bonus_amount?: number | null
          bonus_paid?: boolean | null
          created_at?: string | null
          id?: string
          is_paid?: boolean | null
          referred_id: string
          referrer_id: string
        }
        Update: {
          bonus_amount?: number | null
          bonus_paid?: boolean | null
          created_at?: string | null
          id?: string
          is_paid?: boolean | null
          referred_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          account_number: string
          amount: number
          completed_at: string | null
          created_at: string | null
          id: string
          payment_method: string
          status: string | null
          user_id: string
          username: string
        }
        Insert: {
          account_number: string
          amount: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          payment_method: string
          status?: string | null
          user_id: string
          username: string
        }
        Update: {
          account_number?: string
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string
          status?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey"
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
      update_user_balance: {
        Args: { user_id: string; amount: number }
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
