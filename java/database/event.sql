-- Table: public.event

-- DROP TABLE IF EXISTS public.event;

CREATE TABLE IF NOT EXISTS public.event
(
    event_id integer NOT NULL,
    user_id integer,
    date date,
    "time" timestamp(2) without time zone,
    CONSTRAINT "invite _pkey" PRIMARY KEY (event_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event
    OWNER to postgres;