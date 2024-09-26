import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchJokes } from "./helpers";
import { Joke } from "./interfaces";

import './styles.scss';
export const Main: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');

    const { data: jokes = [], isLoading, error } = useQuery<Joke[], Error>(
        ['jokes', debouncedQuery],
        () => fetchJokes(debouncedQuery),
        {
            enabled: debouncedQuery.length > 3,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (query.length > 3 && query !== debouncedQuery) {
            const timeoutId = setTimeout(() => {
                setDebouncedQuery(query);
            }, 500); // Задержка в 500 мс

            return () => clearTimeout(timeoutId);
        }
    }, [query, debouncedQuery]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value);
    }, []);

    return (
        <div className="container">
            <h1>Шутки Чака Норриса</h1>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Минимум 4 буквы"
            />
            <p>Всего шуток: {jokes.length }</p>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <ul>
                {jokes.map((joke) => (
                    <li key={joke.id}>{joke.value}</li>
                ))}
            </ul>
        </div>
    );
};