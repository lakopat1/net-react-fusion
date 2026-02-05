using System;
using Bogus;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;

namespace api.Seed;
public interface IInitializer
{
    void Initialize();
}