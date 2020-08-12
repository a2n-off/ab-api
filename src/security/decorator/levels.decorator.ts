import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Are level is kind simple : set & distribute metadata to the pipe for the 'levels' tag
 * @param {string[]} levels the list of level
 * @return {CustomDecorator} return SetMetadata
 */
export const Levels = (...levels: string[]): CustomDecorator => SetMetadata('levels', levels);
