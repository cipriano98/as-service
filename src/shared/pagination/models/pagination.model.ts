export interface IPagination<Entity> {
  data: Entity[]
  page: number
  pageSize: number
  totalItems: number
}
