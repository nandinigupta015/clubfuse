import pyodbc

def inspect_database():
    try:
        conn = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=.\\SQLEXPRESS;"
    "DATABASE=ClubFuse;"
    "Trusted_Connection=yes;"
)

        cursor = conn.cursor()

        print("\n📦 TABLES:")
        cursor.execute("""
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE='BASE TABLE'
        """)
        tables = cursor.fetchall()
        for t in tables:
            print("-", t[0])

        print("\n👁️ VIEWS:")
        cursor.execute("""
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.VIEWS
        """)
        views = cursor.fetchall()
        for v in views:
            print("-", v[0])

        print("\n⚙️ STORED PROCEDURES:")
        cursor.execute("""
            SELECT name
            FROM sys.procedures
        """)
        procs = cursor.fetchall()
        for p in procs:
            print("-", p[0])

        conn.close()

        print("\n✅ Database connection completed")

    except Exception as e:
        print("❌ Error inspecting database")
        print(e)


if __name__ == "__main__":
    inspect_database()