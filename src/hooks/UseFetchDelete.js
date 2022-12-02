/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';

export const useFetchDelete = (url, token) => {
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => () => {
            isMounted.current = false;
        }, []);

    useEffect(() => {
        setState({ data: null, loading: true, error: null });

        fetch(url, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authtoken: token,
            },
            method: 'DELETE',
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data,
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info',
                });
            });
    }, [url]);

    return state;
};
