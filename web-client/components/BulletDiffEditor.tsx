
import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

interface DiffEditorProps {
    oldValue: string;
    newValue: string;
}

const BulletDiffEditor: React.FC<DiffEditorProps> = ({ oldValue, newValue }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <ReactDiffViewer
                oldValue={oldValue}
                newValue={newValue}
                splitView={true}
                compareMethod={DiffMethod.WORDS}
                styles={{
                    variables: {
                        light: {
                            diffViewerBackground: '#fff',
                            addedBackground: '#e6ffed',
                            removedBackground: '#ffeef0',
                        }
                    }
                }}
            />
            <div style={{ padding: '10px', background: '#f9f9f9', display: 'flex', gap: '10px' }}>
                <button style={btnStyle('green')}>Accept Change</button>
                <button style={btnStyle('red')}>Reject Change</button>
            </div>
        </div>
    );
};

const btnStyle = (color: string) => ({
    padding: '8px 16px',
    backgroundColor: color === 'green' ? '#2ecc71' : '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
});

export default BulletDiffEditor;
