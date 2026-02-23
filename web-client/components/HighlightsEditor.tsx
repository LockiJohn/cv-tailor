import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import InlineEdit from './InlineEdit';

// Accepts either a full BulletPoint (with id/tags/status) or a minimal { original, tailored }
interface BulletLike {
    id?: string;
    original: string;
    tailored?: string;
    tags?: string[];
    status?: string;
}

interface HighlightsEditorProps {
    highlights: BulletLike[];
    onChange: (newHighlights: BulletLike[]) => void;
}

const HighlightsEditor: React.FC<HighlightsEditorProps> = ({ highlights, onChange }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Ensure every item has a string ID for dnd-kit
    const items = highlights.map((h, idx) => h.id || `highlight-${idx}`);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.indexOf(String(active.id));
            const newIndex = items.indexOf(String(over.id));
            onChange(arrayMove(highlights, oldIndex, newIndex));
        }
    };

    const updateHighlightText = (index: number, newTailored: string) => {
        const updated = [...highlights];
        updated[index] = { ...updated[index], tailored: newTailored };
        onChange(updated);
    };

    if (!highlights || highlights.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nessun bullet point da mostrare. Genera prima il CV Tailored.
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {highlights.map((highlight, idx) => {
                    const itemId = highlight.id || `highlight-${idx}`;
                    return (
                        <SortableItem key={itemId} id={itemId}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {/* Only show "original" label if there's actually a tailored version */}
                                {highlight.tailored && highlight.tailored !== highlight.original && (
                                    <div style={{
                                        fontSize: '0.78rem',
                                        color: 'var(--text-muted)',
                                        fontStyle: 'italic',
                                        padding: '2px 0',
                                        borderLeft: '2px solid var(--glass-border)',
                                        paddingLeft: '8px'
                                    }}>
                                        Originale: "{highlight.original}"
                                    </div>
                                )}
                                <InlineEdit
                                    value={highlight.tailored || highlight.original}
                                    onSave={(val) => updateHighlightText(idx, val)}
                                />
                                {/* Status badge */}
                                {highlight.status && highlight.status !== 'original' && (
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '2px 8px',
                                        borderRadius: '999px',
                                        background: highlight.status === 'accepted' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
                                        color: highlight.status === 'accepted' ? 'var(--success)' : 'var(--primary)',
                                        alignSelf: 'flex-start'
                                    }}>
                                        {highlight.status === 'suggested' ? '✨ Suggerito dall\'AI' : `✓ ${highlight.status}`}
                                    </span>
                                )}
                            </div>
                        </SortableItem>
                    );
                })}
            </SortableContext>
        </DndContext>
    );
};

export default HighlightsEditor;
