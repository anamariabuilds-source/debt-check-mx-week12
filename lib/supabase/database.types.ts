export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      scenarios: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          review_start_month: string;
          horizon_months: number;
          currency: string;
          schema_version: string;
          calculation_version: string;
          scenario_result_state: "complete" | "partial" | "undeterminable";
          input_snapshot: Json;
          result_snapshot: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          review_start_month: string;
          horizon_months?: number;
          currency?: string;
          schema_version: string;
          calculation_version: string;
          scenario_result_state: "complete" | "partial" | "undeterminable";
          input_snapshot: Json;
          result_snapshot: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["scenarios"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type ScenarioRow = Database["public"]["Tables"]["scenarios"]["Row"];
export type ScenarioInsert = Database["public"]["Tables"]["scenarios"]["Insert"];
