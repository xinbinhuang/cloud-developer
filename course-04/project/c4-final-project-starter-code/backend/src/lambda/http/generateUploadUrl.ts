import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getPresignedUrl } from '../../businessLogic/attachmentUrl'
import { getTodoById } from '../../businessLogic/todos'


const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`user ${userId} requesting Presigned URL for non exists todo: ${todoId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`TODO not exists.`)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: getPresignedUrl(todoId)
    })
  }
})


handler.use(
  cors({
    credentials: true
  })
)
