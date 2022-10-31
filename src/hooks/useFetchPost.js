import { useState, useEffect, useRef } from 'react';

export const useFetchPost = (url, body, token) => {
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => () => {
            isMounted.current = false;
        }, []);

    useEffect(() => {
        setState({ data: null, loading: true, error: null });
        const headers = { 'Content-type': 'application/json; charset=UTF-8' };
        if (token) {
          headers.authtoken = token;
        }
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers,
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
