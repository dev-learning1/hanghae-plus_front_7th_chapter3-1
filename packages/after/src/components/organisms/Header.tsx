import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--ds-color-surface-base)',
      borderBottom: '1px solid var(--ds-color-border-subtle)',
      boxShadow: 'var(--ds-shadow-card)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--ds-color-brand-accent-500)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ds-color-text-inverse)',
            fontWeight: 'bold',
            fontSize: '20px',
          }}>
            L
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--ds-color-text-strong)',
              margin: 0,
              lineHeight: 1,
            }}>
              Hanghae Company
            </h1>
            <p style={{
              fontSize: '11px',
              color: 'var(--ds-color-text-subtle)',
              margin: 0,
              lineHeight: 1,
              marginTop: '2px',
            }}>
              Design System Migration Project
            </p>
          </div>
        </div>


        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            textAlign: 'right',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--ds-color-text-strong)',
            }}>
              Demo User
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--ds-color-text-subtle)',
            }}>
              demo@example.com
            </div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-color-brand-primary-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ds-color-brand-accent-500)',
            fontWeight: '600',
            fontSize: '16px',
          }}>
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
