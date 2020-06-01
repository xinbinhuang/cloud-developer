import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo, getTodoById } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('updateTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  await updateTodo(userId, todoId, updatedTodo)

  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`user ${userId} requesting UPDATE for non exists todo: ${todoId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`TODO not exists.`)
    }
  }
  
  return {
    statusCode: 200,
    body: null
  }
})


handler.use(
  cors({
    credentials: true
  })
)
