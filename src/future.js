import React, { Timeout } from 'react';
import { createResource } from 'hitchcock';

export const createFetcher=createResource;

export function Placeholder(props) {
    return (
        <Timeout ms={props.delayMs}>
            { didExpire => didExpire ? props.fallback : props.children }
        </Timeout>
    );
}