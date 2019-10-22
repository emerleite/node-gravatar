import gravatar from '.';

gravatar.url('email@example.com');
gravatar.url('email@example.com', { size: 200, rating: 'pg', default: '404' });
gravatar.url('email@example.com', { size: 200, rating: 'pg', default: '404' });
gravatar.url('email@example.com', { size: 200 });
gravatar.url('email@example.com', { default: '404' });
gravatar.url('email@example.com', { size: 200, rating: 'pg', default: '404' }, true);
gravatar.url('email@example.com', { size: 200, rating: 'pg', default: '404' }, false);
gravatar.url('email@example.com', { default: '404' }, false);
gravatar.url('email@example.com', { forceDefault: true }, false);
gravatar.url('email@example.com', { forceDefault: true });
gravatar.url('email@example.com', { protocol: 'https' });
gravatar.url('email@example.com', { format: 'xml' });
