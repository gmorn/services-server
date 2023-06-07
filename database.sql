-- таблица пользователей
create TABLE uesr(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    password VARCHAR(255),
    user_logo TEXT,
)

-- таблица организаций
create TABLE organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    owner_id INTEGER
    header TEXT,
    description TEXT,

    FOREIGN KEY (owner_id) REFERENCES uesr (id)
)

-- таблица услуг
create TABLE service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    organization_id INTEGER,
    cart_logo TEXT,
    page_logo TEXT,
    description TEXT,
    category_id INTEGER,

    FOREIGN KEY (organization_id) REFERENCES organization (id)
)

-- таблица возмодных записай для услуги
create TABLE recording_time (
    id SERIAL PRIMARY KEY,
    day VARCHAR(255),
    time VARCHAR(255)
    service_id INTEGER,

    FOREIGN KEY (service_id) REFERENCES service (id)
)

-- таблица актуальных записей пользователя
create TABLE current_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    servises_id INTEGER,
    recording_time_id INTEGER,

    FOREIGN KEY (user_id) REFERENCES uesr (id),
    FOREIGN KEY (servises_id) REFERENCES service (id),
    FOREIGN KEY (recording_time_id) REFERENCES recording_time (id)
)

-- таблица для новостей
create TABLE news (
    id SERIAL PRIMARY KEY,
    organizations_id INTEGER,
    news_logo TEXT,
    title VARCHAR(255),
    content TEXT,
    date VARCHAR(255),

    FOREIGN KEY (organizations_id) REFERENCES organization (id),
)

-- таблица категорий
create TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
)

-- таблица заблокированных пользователей
create TABLE banned_user {
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    date DATE,

    FOREIGN KEY (user_id) REFERENCES user (id),
}

-- таблица комментариев к услугам
create TABLE comment_service (
    id SERIAL PRIMARY KEY,
    service_id INTEGER
    user_id INTEGER
    content TEXT

    FOREIGN KEY (service_id) REFERENCES service (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
)

-- таблица комментариев к организациям
create TABLE comment_organization (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER
    user_id INTEGER
    content TEXT

    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
)