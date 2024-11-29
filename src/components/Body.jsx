import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Card from './Card';
import '../style/Body.css';

import addIcon from '../asset/add.svg';
import todoIcon from '../asset/To-do.svg';
import inProgressIcon from '../asset/in-progress.svg';
import doneIcon from '../asset/Done.svg';
import canceledIcon from '../asset/Cancelled.svg';

export default function Body({ grouping, sortOption }) {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    // Fetch Data
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await response.json();
            setTickets(data.tickets || []);
            setUsers(data.users || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Get User Name
    const getUserName = useCallback((userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : 'Unknown';
    }, [users]);

    // Sort Tickets
    const sortTickets = useMemo(() => {
        return (tickets) => {
            switch (sortOption) {
                case 'Priority':
                    return [...tickets].sort((a, b) => b.priority - a.priority);
                case 'Title':
                    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
                default:
                    return tickets;
            }
        };
    }, [sortOption]);

    const renderColumns = useMemo(() => {
        if (isLoading) return <p>Loading...</p>;
        const sortedTickets = sortTickets(tickets);
        const statuses = ['Add', 'Todo', 'In progress', 'Done', 'Canceled'];
        if (!tickets.length) return <p>No tickets available.</p>;

        // Map status to icons
        const statusIcons = {
            Add: addIcon,
            Todo: todoIcon,
            'In progress': inProgressIcon,
            Done: doneIcon,
            Canceled: canceledIcon,
        };

        switch (grouping) {
            case 'By Status':
                return statuses.map((status) => (
                    <div className="column" key={status}>
                        {/* Icon integration in headers */}
                        <h3>
                            <img
                                src={statusIcons[status]}
                                alt={`${status} icon`}
                                className="status-icon"
                            />
                            {status.toUpperCase()}
                        </h3>
                        {sortedTickets
                            .filter((ticket) => ticket.status === status)
                            .map((ticket) => {
                                const user = users.find((u) => u.id === ticket.userId); // Find the user
                                return (
                                    <Card
                                        key={ticket.id}
                                        id={ticket.id}
                                        title={ticket.title}
                                        tags={ticket.tag}
                                        status={user?.available || false} // Pass user availability
                                        avatarUrl={`https://via.placeholder.com/40?text=${getUserName(ticket.userId)[0]}`}
                                        showImage={grouping !== 'By User'}
                                    />
                                );
                            })}
                    </div>
                ));

            case 'By User':
                return users.map((user) => (
                    <div className="column" key={user.id}>
                        <h3>{user.name}</h3>
                        {sortedTickets
                            .filter((ticket) => ticket.userId === user.id)
                            .map((ticket) => (
                                <Card
                                    key={ticket.id}
                                    id={ticket.id}
                                    title={ticket.title}
                                    tags={ticket.tag}
                                    status={user.available} // Directly pass user's status
                                    avatarUrl={`https://via.placeholder.com/40?text=${user.name[0]}`}
                                    showImage={grouping !== 'By User'}
                                />
                            ))}
                    </div>
                ));

            case 'By Priority':
                const priorities = [...new Set(tickets.map((ticket) => ticket.priority))].sort((a, b) => b - a);
                return priorities.map((priority) => (
                    <div className="column" key={priority}>
                        <h3>Priority {priority}</h3>
                        {sortedTickets
                            .filter((ticket) => ticket.priority === priority)
                            .map((ticket) => {
                                const user = users.find((u) => u.id === ticket.userId); // Find the user
                                return (
                                    <Card
                                        key={ticket.id}
                                        id={ticket.id}
                                        title={ticket.title}
                                        tags={ticket.tag}
                                        status={user?.available || false} // Pass user availability
                                        avatarUrl={`https://via.placeholder.com/40?text=${getUserName(ticket.userId)[0]}`}
                                        showImage={grouping !== 'By User'}
                                    />
                                );
                            })}
                    </div>
                ));

            default:
                return <p>Invalid grouping option.</p>;
        }
    }, [grouping, tickets, users, sortTickets, getUserName, isLoading]);

    return (
        <div className="body">
            <div className="columns">{renderColumns}</div>
        </div>
    );
}
