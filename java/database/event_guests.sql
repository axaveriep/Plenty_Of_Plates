-- Table: public.event_guests 

-- DROP TABLE IF EXISTS public."event_guests ";

CREATE TABLE IF NOT EXISTS public.event_guests
(
    event_id integer,
    guest_id integer,
    voted boolean,
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.event (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event_guests
    OWNER to postgres;