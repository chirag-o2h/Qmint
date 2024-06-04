export type RenderFieldType =
  | 'password'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'text'
  | 'number'
  | 'date'
  | 'slider'
  | 'file'
  | "phoneInput"
  | "dateRange"
  | "autocomplete"
  | "checkbox2"

export interface FieldOption {
  id: string
  name: string
  label: string
  value: string
  disabled?: boolean
  checked?: boolean
}
