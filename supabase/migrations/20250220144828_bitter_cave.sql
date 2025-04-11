/*
  # Create draw history table

  1. New Tables
    - `draw_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text, draw type: 'number', 'words', or 'sequence')
      - `result` (jsonb, stores the draw result)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `draw_history` table
    - Add policies for:
      - Users can read their own draw history
      - Users can insert their own draw history
*/

CREATE TABLE IF NOT EXISTS draw_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('number', 'words', 'sequence')),
  result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE draw_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own draw history"
  ON draw_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own draw history"
  ON draw_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);