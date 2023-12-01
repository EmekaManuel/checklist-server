export interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}

export interface ICategory {
  _id: string;
  name: string;
  user: string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

export interface ITask {
  _id: string;
  name: string;
  categoryId: string;
  user: string;
  isCompleted: string;
  isEditable: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
