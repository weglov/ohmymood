export enum Mood {
  Bad = 'Bad',
  Good = 'Good',
  Great = 'Great',
  Ok = 'OK',
  Terrible = 'Terrible',
}

export interface Mark {
  id: string
  note?: string | null
  mood: Mood
  createdAt: any
}
