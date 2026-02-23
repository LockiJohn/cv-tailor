import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
        position: 'relative' as const,
    };

    return (
        <div ref={setNodeRef} style={style} className="sortable-item">
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                background: 'var(--surface)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--glass-border)',
                marginBottom: '0.5rem'
            }}>
                <div
                    {...attributes}
                    {...listeners}
                    style={{ cursor: 'grab', color: 'var(--text-muted)', marginTop: '4px' }}
                >
                    <GripVertical size={20} />
                </div>
                <div style={{ flex: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SortableItem;
